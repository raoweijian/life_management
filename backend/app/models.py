from django.db import models

class Item(models.Model):
    name = models.CharField(max_length=200)
    amount_logged = models.IntegerField(default=0, null=False)
    amount_logged_at = models.DateTimeField('the datetime we logged the actual amount')
    consume_speed = models.FloatField(default=0, null=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
