import datetime

checkin_date_str =  '2023-09-16T23:29'
checkout_date_str =  '2023-09-21T09:39'

checkin_date = datetime.datetime.strptime(checkin_date_str, "%Y-%m-%dT%H:%M")
checkout_date = datetime.datetime.strptime(checkout_date_str, "%Y-%m-%dT%H:%M")


check_in = datetime.datetime(2023, 9, 10, 23, 24, tzinfo=datetime.timezone.utc)
check_out = datetime.datetime(2023, 9, 16, 23, 25, tzinfo=datetime.timezone.utc)

print(checkin_date > check_in)

