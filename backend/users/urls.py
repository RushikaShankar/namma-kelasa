from django.urls import path

from .views import (
    FarmerRegisterView,
    WorkerRegisterView,
    FarmerDetailView,
    JobCreateView,
    JobAcceptView,
    JobBookingStatusView,
    FarmerJobStatusView,
    PhoneLoginView,
)


urlpatterns = [

    # ==============================
    # FARMER
    # ==============================

    path(
        "register/farmer/",
        FarmerRegisterView.as_view()
    ),

    path(
        "farmer/<str:phone>/",
        FarmerDetailView.as_view()
    ),


    # ==============================
    # WORKER
    # ==============================

    path(
        "register/worker/",
        WorkerRegisterView.as_view()
    ),


    # ==============================
    # LOGIN
    # ==============================

    path(
        "login/",
        PhoneLoginView.as_view()
    ),


    # ==============================
    # JOBS
    # ==============================

    path(
        "jobs/create/",
        JobCreateView.as_view()
    ),

    path(
        "jobs/accept/",
        JobAcceptView.as_view()
    ),

    path(
        "jobs/<int:job_id>/booking-status/<int:worker_id>/",
        JobBookingStatusView.as_view()
    ),

    path(
        "jobs/<int:job_id>/status/",
        FarmerJobStatusView.as_view()
    ),
]