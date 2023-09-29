from rest_framework import status
from rest_framework.response import Response

def record_created_response(payload):
    return Response(payload,status=status.HTTP_201_CREATED)

def operation_ok_response(payload):
    return Response(payload,status=status.HTTP_200_OK)

def bad_request_error_response(payload):
    return Response(payload,status=status.HTTP_400_BAD_REQUEST)

def unauthorised_user_response(payload):
    return Response(payload,status=status.HTTP_401_UNAUTHORIZED)

def forbidden_operation_response(payload):
    return Response(payload,status=status.HTTP_403_FORBIDDEN)

def resource_not_found_response(payload):
    return Response(payload,status=status.HTTP_404_NOT_FOUND)

def method_not_permitted_response(payload):
    return Response(payload,status=status.HTTP_405_METHOD_NOT_ALLOWED)

def conflict_error_response(payload):
    return Response(payload,status=status.HTTP_409_CONFLICT)

def internal_server_error_response(payload):
    return Response(payload,status=status.HTTP_500_INTERNAL_SERVER_ERROR)
