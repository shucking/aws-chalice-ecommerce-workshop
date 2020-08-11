class Order:
    def __init__(self, user_id, order_id, order_status, order_date, address, total_cart_price):
        self.user_id = user_id
        self.order_id = order_id
        self.order_status = order_status
        self.order_date = order_date
        self.address = address
        self.total_cart_price = total_cart_price

    def get_order_info(self):
        return {
            'PK': self.get_user_id(),
            'SK': self.get_order_id(),
            'order_status': self.get_status(),
            'order_date': self.get_order_date(),
            'address': self.get_address(),
            'total_cart_price': self.get_total_cart_price()}

    def get_user_id(self):
        return self.user_id

    def get_order_id(self):
        return self.order_id

    def get_status(self):
        return self.order_status

    def get_order_date(self):
        return self.order_date

    def get_address(self):
        return self.address

    def get_total_cart_price(self):
        return self.total_cart_price
