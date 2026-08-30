from django.db import models


class Farmer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=128, blank=True, default="")
    land_location = models.CharField(max_length=255)
    field_type = models.CharField(max_length=100)
    major_crop = models.CharField(max_length=100)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Worker(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=10, unique=True)
    password = models.CharField(max_length=128, blank=True, default="")
    village = models.CharField(max_length=255)
    experience = models.CharField(max_length=100)
    rating = models.FloatField(default=5.0)
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Job(models.Model):
    farmer = models.ForeignKey(
        Farmer,
        on_delete=models.CASCADE,
        related_name="jobs"
    )
    work_type = models.CharField(max_length=100)
    date = models.DateField()
    workers_required = models.PositiveIntegerField()
    wage = models.PositiveIntegerField()
    location = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.work_type} - {self.date}"

class JobBooking(models.Model):
    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE,
        related_name="bookings"
    )

    worker = models.ForeignKey(
        Worker,
        on_delete=models.CASCADE,
        related_name="job_bookings"
    )

    accepted_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["job", "worker"],
                name="unique_job_worker"
            )
        ]

    def __str__(self):
        return f"{self.worker.name} - {self.job.work_type}"