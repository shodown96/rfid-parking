from django.conf import settings

# paystack_api = settings.PAYSTACK_API
# WEBSITE_EMAIL = settings.WEBSITE_EMAIL

# def pay(request):
#     try:
#         order = Order.objects.get(user=request.user, ordered=False)

#         check_order_stock(request,order)

#         amount = int(order.get_total())

#         url = "https://api.paystack.co/transaction/initialize"
#         current_site = get_current_site(request)
#         domain = current_site.domain
#         payload = {
#             "email": request.user.email,
#             "amount": (amount * 100),
#             "currency": "NGN",
#             "callback_url": f"http://{domain}/payment/callback/verify/",
#             "metadata": {
#                 "cancel_action": f"http://{domain}/payment/cancel/"
#             }
#         }

#         headers = {
#             'Content-Type': 'application/json',
#             'Authorization': 'Bearer ' + paystack_api,
#         }

#         response = requests.request(
#             "POST", url, headers=headers, data=json.dumps(payload))

#         # print(response.text.encode('utf8'), '\n')
#         r = response.json()
#         print(json.dumps(r, indent=4))
#         if r['status']:
#             payment = Payment(
#                 status="abandoned",
#                 user=request.user,
#                 email=request.user.email,
#                 amount=amount,
#                 access_code=r['data']['access_code'],
#                 authorization_url=r['data']['authorization_url'],
#                 reference=r['data']['reference']
#             )
#             payment.save()
#             order.payment_id = payment.pk
#             order.ref_code = r['data']['reference']
#             order.save()

#             return redirect(r['data']['authorization_url'])
#         elif r['message'] == "Duplicate Transaction Reference":
#             # payment = Payment.objects.get(reference=reference)
#             # if payemnt.status == "abandoned":
#             return redirect(payment.authorization_url)
#         else:
#             messages.error(
#                 request, "Oops, seems like something went wrong, please try again later, thank you", extra_tags="danger")
#             return redirect("core:checkout")
#     except ObjectDoesNotExist:
#         messages.error(request, "You do not have an active order")
#         return redirect("/")