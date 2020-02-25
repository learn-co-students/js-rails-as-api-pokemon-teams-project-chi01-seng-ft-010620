class PokemonsController < ApplicationController

    def create
        #byebug
        name = Faker::Name.first_name
        species= Faker::Games::Pokemon.name
        pokemon = Pokemon.create(nickname: name , species: species , trainer_id: params[:trainer])
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find_by(id: params[:id])
        pokemon.destroy
        render json: pokemon
    end
end
