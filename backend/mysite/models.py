from django.db import models


class Item(models.Model):
    name = models.CharField(max_length=200)
    amount_logged_last_time = models.IntegerField(default=0)
    logged_at = models.DateTimeField("The latest timestamp we logged the actual amount")
    consume_speed = models.FloatField(default=0)
