class PokemonsController < ApplicationController
    def create 
        trainer = Trainer.find_by(id: params[:trainer_id])
        Pokemon.create(nickname: Faker::Name.first_name, species: Faker::Games::Pokemon.name, trainer_id: trainer.id )

        trainer_data = Trainer.all.map{|trainer| [trainer, trainer.pokemons]}
        render json: trainer_data
    end

    def destroy
        pokeman = Pokemon.find_by(id: params[:pokemon_id].to_i)
        pokeman.destroy
        trainer_data = Trainer.all.map{|trainer| [trainer, trainer.pokemons]}
        render json: trainer_data
    end

end
