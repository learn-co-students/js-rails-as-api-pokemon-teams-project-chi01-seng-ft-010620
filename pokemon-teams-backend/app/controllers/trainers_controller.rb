class TrainersController < ApplicationController
    def index
        trainers = Trainer.all.map{|trainer| [trainer, trainer.pokemons]}
        render json: trainers
    end 
end
