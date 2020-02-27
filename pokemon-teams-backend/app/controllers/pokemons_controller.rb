class PokemonsController < ApplicationController
    def create
        # create a new Pokemon
            # faker nickname
            # fake Pokemon species
        # add trainer id
        # render json Pokemon to frontend
        name = Faker::Name.first_name
        species = Fake::Games::Pokemon.name
        pokemon = Pokemon.create(name = nmae, species = species, trainer_id: params[:trainer_id]
        render json: pokemon
    end

    def destroy
        pokemon = Pokemon.find(params[:id])
        pokemon.destroy
        render json: {message: "success"}
    end
end
