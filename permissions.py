from rest_framework import permissions

class IsAdminUserCustom(permissions.BasePermission):
    """
    Allows access only to users who have is_admin=True.
    """

    def has_permission(self, request, view):
        # Check if user is authenticated and marked as admin
        return bool(
            request.user
            and request.user.is_authenticated
            and getattr(request.user, 'is_admin', False)
        )
