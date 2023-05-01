require 'rails_helper'

RSpec.describe User, type: :model do
  user = User.new(username: 'sean', first_name:'sean', last_name: 'balayan', email_address: 'sean@yahoo.com', password: '123456', password_confirmation: '123456')

  describe 'attributes #username, #first_name, #last_name, #email_address, and #password_digest' do
    it "returns the username, first_name, last_name, and password_digest" do
      expect(user.username).to eq('sean')
      expect(user.first_name).to eq('sean')
      expect(user.last_name).to eq('balayan')
      expect(user.email_address).to eq('sean@yahoo.com')
      expect(user.password_digest)

    end
  end

  describe 'attributes #password and #password confirmation' do
    it 'are unavailable within the user instance' do
      expect(!user.password)
      expect(!user.password_confirmation)
    end
  end
end
