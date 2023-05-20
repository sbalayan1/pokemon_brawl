class PokemonMoveSerializer < ActiveModel::Serializer
    attributes :id

    belongs_to :pokemon
    belongs_to :move
end