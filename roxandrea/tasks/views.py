from django.db import connections
from django.db import connection
from rest_framework.views import APIView
from customresponses import *



class ResetReservationsTables(APIView):
    
    def get(self,request):
        self.execute_sql_commands()
        response = {'status':True}
        return operation_ok_response(response)
    
    def execute_sql_commands(self):
        # Get the default database connection (you can specify a different one if needed)
        db_connection = connection

        # Define your SQL commands
        sql_commands = [
            "DELETE FROM reservations_reservations_rooms;",
            "DELETE FROM reservations_reservations_bills;",
            "DELETE FROM reservations_reservations;",
            "UPDATE rooms_rooms SET no_occupants=NULL;",
            "UPDATE rooms_rooms SET dead_reservation_token=NULL;",
            "UPDATE rooms_rooms SET is_ready=1;",
            "UPDATE rooms_rooms SET occupant_id=NULL;",
            "UPDATE rooms_rooms SET check_out_date=NULL;",
            "UPDATE rooms_rooms SET check_in_date=NULL;",
            "UPDATE rooms_rooms SET is_occupied=0;",
            "UPDATE rooms_rooms SET is_available=1;",
            "UPDATE rooms_rooms SET is_checked_in=0;"
        ]

        try:
            with db_connection.cursor() as cursor:
                for sql_command in sql_commands:
                    cursor.execute(sql_command)

            # Commit the changes to the database
            db_connection.commit()

        except Exception as e:
            # Handle any exceptions that may occur during execution
            print("Error executing SQL commands:", e)
        finally:
            # Close the database connection
                db_connection.close()
