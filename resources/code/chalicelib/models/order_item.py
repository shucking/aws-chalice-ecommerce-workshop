class OrderItem:
    def __init__(self, item_id, order_id, product_name, quantity, total_item_price):
        self.item_id = item_id
        self.order_id = order_id
        self.product_name = product_name
        self.quantity = quantity
        self.total_item_price = total_item_price

    def get_item_id(self):
        return self.item_id

    def get_order_id(self):
        return self.order_id

    def get_product_name(self):
        return self.product_name

    def get_quantity(self):
        return self.quantity

    def get_total_item_price(self):
        return self.total_item_price

    def get_order_item_info(self):
        return {
            'PK': self.get_item_id(),
            'SK': self.get_order_id(),
            'product_name': self.get_product_name(),
            'quantity': self.get_quantity(),
            'total_item_price': self.get_total_item_price()}
