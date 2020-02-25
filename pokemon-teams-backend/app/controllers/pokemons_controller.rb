class PokemonsController < ApplicationController

    def create
        name = Faker::Name.first_name
        species = Faker::Games::Pokemon.name
        trainer = Trainer.find_by(id: params[:trainer_id])
        pokemon = Pokemon.create(nickname: name, species: species, trainer_id: trainer.id)
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.delete
        render json: pokemon
    end

end
