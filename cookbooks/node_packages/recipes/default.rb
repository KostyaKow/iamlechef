execute "npm -g nodemon" do
  command "npm install -g nodemon"
end

execute "npm -g express" do
  command "npm install -g express@#{node['node_packages']['express']['version']}"
end
