from django.core.mail import send_mail, EmailMultiAlternatives
import os

                            
class Mailservice(object):
    def new_reservation_template():
        return """  
                <div class="col-12">
                    <h2 style="color:blue;">{0}</h2>
                    <h4>Dear {1}</h4>,
                        <p>Roxandrea Hotel reservation with token {2} and room number {3} was made with you as a occupant</p>
                        
                </div>
                """
         
    def send_outwards_mail(mail_parameters):
        
        try:
            templates = {
                         "new_reservation_template":Mailservice.new_reservation_template,
                         }
            html_content = templates[mail_parameters['ir_template']]()
            html_content = html_content.format(
                                                mail_parameters['subject'],
                                                mail_parameters['recipient'],
                                                mail_parameters.get('reservation_token'),
                                                mail_parameters.get('room_no')
                                                )
            msg = EmailMultiAlternatives(mail_parameters['subject'],"",'no-reply@roxandrea.com', mail_parameters['recipient'])
            msg.attach_alternative(html_content, "text/html")
            mail_status = msg.send() 
            return mail_status
            
        except Exception as e:
            print("MAIL ERROR===>",str(e))
        
        
    
       