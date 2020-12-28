require 'filewatcher'

Filewatcher.new(["generate-site.rb", "config.yml", "templates/", "javascript/", "images/"]).watch do |changes|
  puts "Updated: #{changes}"
  puts ""
  `ruby generate-site.rb`
end
