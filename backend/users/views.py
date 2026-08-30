from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth.hashers import make_password

from .models import Farmer, Worker, Job, JobBooking
from .serializers import FarmerSerializer, WorkerSerializer, JobSerializer, JobBookingSerializer


class FarmerRegisterView(APIView):

    def post(self, request):
        serializer = FarmerSerializer(data=request.data)

        if serializer.is_valid():
            farmer = serializer.save(password=make_password(request.data.get("password"))
            )

            return Response(
                FarmerSerializer(farmer).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class WorkerRegisterView(APIView):

    def post(self, request):
        serializer = WorkerSerializer(data=request.data)

        if serializer.is_valid():
            worker = serializer.save(password=make_password(request.data.get("password"))
            )

            return Response(
                WorkerSerializer(worker).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

class FarmerDetailView(APIView):

    def get(self, request, phone):
        try:
            farmer = Farmer.objects.get(phone=phone)
        except Farmer.DoesNotExist:
            return Response(
                {"detail": "Farmer not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = FarmerSerializer(farmer)

        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

class JobCreateView(APIView):

    def post(self, request):
        serializer = JobSerializer(data=request.data)

        if serializer.is_valid():
            job = serializer.save()

            return Response(
                JobSerializer(job).data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def get(self, request):

        jobs = Job.objects.all().order_by("-created_at")

        job_data = []

        for job in jobs:

            booked_count = JobBooking.objects.filter(
                job=job
            ).count()

            job_data.append({
                "id": job.id,
                "farmer": job.farmer_id,
                "work_type": job.work_type,
                "date": job.date,
                "workers_required": job.workers_required,
                "workers_booked": booked_count,
                "workers_remaining": (
                    job.workers_required - booked_count
                ),
                "wage": job.wage,
                "location": job.location,
                "created_at": job.created_at
            })

        return Response(
            job_data,
            status=status.HTTP_200_OK
        )

class JobAcceptView(APIView):

    def post(self, request):
        job_id = request.data.get("job")
        worker_id = request.data.get("worker")

        if not job_id or not worker_id:
            return Response(
                {"detail": "job and worker are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response(
                {"detail": "Job not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        try:
            worker = Worker.objects.get(id=worker_id)
        except Worker.DoesNotExist:
            return Response(
                {"detail": "Worker not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        # Check whether this worker already accepted this job
        if JobBooking.objects.filter(
            job=job,
            worker=worker
        ).exists():
            return Response(
                {"detail": "You have already accepted this job."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check whether all worker slots are already filled
        booked_count = JobBooking.objects.filter(
            job=job
        ).count()

        if booked_count >= job.workers_required:
            return Response(
                {"detail": "This job is already fully booked."},
                status=status.HTTP_400_BAD_REQUEST
            )

        booking = JobBooking.objects.create(
            job=job,
            worker=worker
        )

        serializer = JobBookingSerializer(booking)

        return Response(
            serializer.data,
            status=status.HTTP_201_CREATED
        )

class JobBookingStatusView(APIView):

    def get(self, request, job_id, worker_id):

        exists = JobBooking.objects.filter(
            job_id=job_id,
            worker_id=worker_id
        ).exists()

        return Response(
            {
                "applied": exists
            },
            status=status.HTTP_200_OK
        )

class FarmerJobStatusView(APIView):

    def get(self, request, job_id):

        try:
            job = Job.objects.get(id=job_id)
        except Job.DoesNotExist:
            return Response(
                {"detail": "Job not found."},
                status=status.HTTP_404_NOT_FOUND
            )

        bookings = JobBooking.objects.filter(
            job=job
        ).select_related("worker")

        workers = []

        for booking in bookings:
            workers.append({
                "id": booking.worker.id,
                "name": booking.worker.name,
                "phone": booking.worker.phone,
                "village": booking.worker.village,
                "rating": booking.worker.rating,
                "accepted_at": booking.accepted_at
            })

        return Response(
            {
                "job_id": job.id,
                "workers_required": job.workers_required,
                "workers_booked": bookings.count(),
                "workers_remaining": (
                    job.workers_required - bookings.count()
                ),
                "workers": workers
            },
            status=status.HTTP_200_OK
        )

# from rest_framework.views import APIView
# from rest_framework.response import Response
# from rest_framework import status

# from .models import Farmer, Worker


class PhoneLoginView(APIView):

    def post(self, request):
        phone = request.data.get("phone")

        if not phone:
            return Response(
                {"error": "Phone number is required"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Check Farmer
        try:
            farmer = Farmer.objects.get(phone=phone)

            return Response({
                "success": True,
                "user_type": "farmer",
                "user": {
                    "id": farmer.id,
                    "name": farmer.name,
                    "phone": farmer.phone,
                    "land_location": farmer.land_location,
                    "field_type": farmer.field_type,
                    "major_crop": farmer.major_crop
                }
            }, status=status.HTTP_200_OK)

        except Farmer.DoesNotExist:
            pass

        # Check Worker
        try:
            worker = Worker.objects.get(phone=phone)

            return Response({
                "success": True,
                "user_type": "worker",
                "user": {
                    "id": worker.id,
                    "name": worker.name,
                    "phone": worker.phone,
                    "location": worker.location,
                    "work_type": worker.work_type,
                    "is_available": worker.is_available
                }
            }, status=status.HTTP_200_OK)

        except Worker.DoesNotExist:
            return Response(
                {"error": "Phone number not registered"},
                status=status.HTTP_404_NOT_FOUND
            )