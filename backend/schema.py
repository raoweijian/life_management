import graphene
from django.utils import timezone
from graphene_django import DjangoObjectType

from app.models import Item


class ItemType(DjangoObjectType):
    class Meta:
        model = Item
        fields = ("name", "amount_logged", "amount_logged_at", "consume_speed", "created_at", "updated_at")

    id = graphene.Int(source='pk')


class Query(graphene.ObjectType):
    items = graphene.List(ItemType)

    def resolve_items(root, info):
        return Item.objects.all()


class ItemMutation(graphene.Mutation):
    class Arguments:
        dbid = graphene.Int(required=True)
        name = graphene.String(required=True)
        amount_logged = graphene.Int(required=True)
        consume_speed = graphene.Float(required=True)
        update_type = graphene.String(required=True)
        auto_calculate = graphene.Boolean(required=False)

    item = graphene.Field(ItemType)

    @classmethod
    def mutate(cls, root, info, dbid, name, amount_logged, consume_speed, update_type, auto_calculate):
        if dbid == 0:
            item = Item()
        else:
            item = Item.objects.get(pk=dbid)

        item.name = name
        if update_type == "amount":
            item.amount_logged = amount_logged
            item.amount_logged_at = timezone.now()
            if auto_calculate:
                item.update_speed(amount_logged)
        else:
            item.consume_speed = consume_speed

        item.save()
        return ItemMutation(item=item)


class Mutation(graphene.ObjectType):
    upsert_item = ItemMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
