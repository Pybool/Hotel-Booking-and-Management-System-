
from datetime import datetime
from django.db.models import Q
from reservations.models import Reservations
from paystack_api import check_payment_status
from rooms.models import RoomType, Rooms


class ReservationValid(object):
    
    def __init__(self, is_availability_check=False, rooms=None):
        self.is_availability_check = is_availability_check
        self.rooms = rooms if rooms is not None else []

    def is_date_available(self, checkin_date_str, checkout_date_str):
        today = datetime.now()
        checkin_date = datetime.strptime(checkin_date_str, "%Y-%m-%d %H:%M")
        checkout_date = datetime.strptime(checkout_date_str, "%Y-%m-%d %H:%M")

        if checkin_date <= today:
            return False, "Check-in date should be in the future or today."

        conflicting_reservations = Reservations.objects.filter(
            Q(check_in__lte=checkout_date, check_out__gte=checkin_date) |
            Q(check_in__lte=checkin_date, check_out__gte=checkin_date)
        )

        reserved_rooms = set()
        for conflict in conflicting_reservations:
            reserved_rooms.update(conflict.rooms.values_list('id', flat=True))

        unavailable_buffer = [room.room_no for room in self.rooms if room.id in reserved_rooms]

        if unavailable_buffer:
            return False, "The timeframe selected will not be available for reservations"
        else:
            return True, "Reservation is available for this timeframe"
    
    def check_for_payment(self,reservation):
        if(RoomType.objects.get(id=reservation['room_type']).require_advance_payment):
            if reservation.get('payment_ref'):
                assert(len(reservation['payment_ref']) > 0)
                status = check_payment_status(reservation['payment_ref'])
                assert(status.get('status', '') == 'success' and round(status.get('amount', '')) == round(RoomType.objects.get(id=reservation['room_type']).advance_amount))
        else:
            pass
    
    def get_object_from_list_by_room_no(self,room_data, room_no):
        for room_obj in room_data:
            if room_obj.room_no == room_no:
                return room_obj
        return None
    
    def calculate_max_allowed(self,selected_rooms, room_data,_type):
        max_occupants = []
        if selected_rooms:
            for room in selected_rooms:
                room_obj = self.get_object_from_list_by_room_no(room_data, room)
                print("room obj == > ", room_obj, room, room_data)
                if getattr(room_obj,_type) is None:
                    if getattr(getattr(room_obj,'room_type'),_type) is not None:
                        max_occupants.append(getattr(getattr(room_obj,'room_type'),_type))
                else:
                    max_occupants.append(getattr(room_obj,_type))
        else:
            for room in room_data:
                if getattr(room,_type) is None:
                    if getattr(getattr(room,'room_type'),_type) is not None:
                        max_occupants.append(getattr(getattr(room,'room_type'),_type))
                else:
                    max_occupants.append(getattr(room,_type))
        
        max_allowed_for_selected_rooms = sum(max_occupants)
        return max_allowed_for_selected_rooms
    
    def is_reservation_valid(self,_filter,reservation,rooms_instance_object):
        errors = []
        print(reservation)
        number_of_rooms = len(reservation.get('rooms')) if reservation.get('rooms') else reservation.get('no_rooms')
        try:
            assert number_of_rooms > 0
        except:
            errors.append("No room was found, select another room type")
        try:
            """Check that the number of available rooms can accomodate the demand"""
            assert(Rooms.objects.filter(**_filter).count() >= number_of_rooms)
            """Check that the room type can accomodate the occupants in the reservation"""
        except:
            errors.append("The number of available rooms cannot sustain the current demand")
            
        try:
            for room in rooms_instance_object:
                assert(room.is_ready and room.is_available) == True
        except:
            errors.append("One or more rooms selected are unavailable at the moment")
            
        # try:
        result = self.calculate_max_allowed(reservation.get('rooms'),rooms_instance_object,'no_adults')
        print(result,int(reservation['no_adults']))
        assert(result >= int(reservation['no_adults']))
        # except:
        #     errors.append(f"The number of adults allowed for this room type has been exceeded only '{RoomType.objects.get(id=reservation['room_type']).no_adults}' Adults are allowed")
        try:
            result = self.calculate_max_allowed(reservation.get('rooms'),rooms_instance_object,'no_children')
            assert(result >= int(reservation['no_children']))
        except:
            errors.append(f"The number of children allowed for this room has been exceeded only '{RoomType.objects.get(id=reservation['room_type']).no_children}' Children are allowed")
        try:
            if reservation.get('no_xtra_adults'):
                assert(RoomType.objects.get(id=reservation['room_type']).no_xtra_adults >= int(reservation['no_xtra_adults']))
        except:
            errors.append(f"The number of Extra adults allowed for this room has been exceeded only '{RoomType.objects.get(id=reservation['room_type']).no_xtra_adults}' Extra Adults are allowed")
        try:
            self.check_for_payment(reservation)
        except Exception as e:
            print(str(e))
            errors.append(f"An advance payment is required for this room type and the payment has not yet been verified")
        return errors
    

# class ReservationValid(object):
    
    # def __init__(self,is_availability_check=False, rooms=[]):
    #     self.rooms = rooms
    #     self.is_availability_check = is_availability_check
    
    # def is_date_available(self,checkin_date_str, checkout_date_str):
    #     # Calculate today's date
    #     today = datetime.now()
    #     # Parse the check-in and check-out dates to datetime objects
    #     checkin_date = datetime.strptime(checkin_date_str, "%Y-%m-%d %H:%M")
    #     checkout_date = datetime.strptime(checkout_date_str, "%Y-%m-%d %H:%M")

    #     # Check if the reservation check-in date is today or in the future
    #     if checkin_date <= today:
    #         return False, "Check-in date should be in the future or today."

    #     # Query reservations for conflicts
    #     print(checkin_date)
    #     print(checkout_date)
        
    #     self.date_conflicting_reservations = Reservations.objects.filter(
    #         check_in__lte=checkout_date,
    #         check_out__gte=checkin_date,
    #     )
    #     self.unavailable_buffer = []
    #     self.aggregate_reserved_rooms = []
    #     for conflict in self.date_conflicting_reservations:
    #         print("Conflict ====> ", conflict)
    #         self.reservation_rooms = conflict.rooms.all().values_list('id',flat=True)
    #         print("Self.rooms ===> ", self.rooms)
    #         print("Reservation rooms ", list(self.reservation_rooms))
    #         self.aggregate_reserved_rooms = self.aggregate_reserved_rooms + list(self.reservation_rooms)
    #         print("Aggregate rooms ====> ", self.aggregate_reserved_rooms)
        
        
    #     for room in self.rooms:
    #         if room.id in self.aggregate_reserved_rooms:
    #             print(f"Room {room.room_no} was found in a earlier reservation")
    #             self.unavailable_buffer.append(room.room_no)
    #         else:
    #             pass
    #         # Check for conflicting reservations
    #     if len(self.unavailable_buffer) > 0:
    #         return False, "The timeframe selected will not be available for reservations"
        
    #     # Reservation is valid
    #     elif len(self.unavailable_buffer) == 0:
    #         return True, "Reservation is available for this timeframe"