Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  devise_for :users,
             path: '',
             path_names: {
               sign_in: 'login',
               sign_out: 'logout',
               registration: 'signup'
             },
             controllers: {
               sessions: 'sessions',
               registrations: 'registrations'
             }

  scope '/api' do
    resources :employees do
      resources :feedbacks, only: [:index, :show]
    end
    resources :feedbacks, only: [:update, :create]
  end
end
