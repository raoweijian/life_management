import graphene
from graphene_django import DjangoObjectType

from app.models import Item


class ItemType(DjangoObjectType):
    class Meta:
        model = Item
        fields = ("id", "name", "amount_logged", "amount_logged_at", "consume_speed", "created_at", "updated_at")


class Query(graphene.ObjectType):
    items = graphene.List(ItemType)

    def resolve_items(root, info):
        return Item.objects.all()


schema = graphene.Schema(query=Query)
