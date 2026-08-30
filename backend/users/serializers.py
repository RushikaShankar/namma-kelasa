from rest_framework import serializers

from .models import Farmer, Worker, Job, JobBooking

class FarmerSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = Farmer

        fields = [
            "id",
            "name",
            "phone",
            "password",
            "land_location",
            "field_type",
            "major_crop",
            "created_at",
        ]


class WorkerSerializer(serializers.ModelSerializer):

    password = serializers.CharField(
        write_only=True,
        required=False
    )

    class Meta:

        model = Worker

        fields = [
            "id",
            "name",
            "phone",
            "password",
            "village",
            "experience",
            "rating",
            "is_available",
            "created_at",
        ]

class JobSerializer(serializers.ModelSerializer):

    class Meta:
        model = Job

        fields = [
            "id",
            "farmer",
            "work_type",
            "date",
            "workers_required",
            "wage",
            "location",
            "created_at",
        ]

class JobBookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = JobBooking

        fields = [
            "id",
            "job",
            "worker",
            "accepted_at",
        ]

