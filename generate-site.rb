require "yaml"
require "fileutils"
require "erb"
require "json"

def output_path(path)
  "generated/#{path}"
end

def relative_path(path)
  result = ""
  result = "/stream-overlay-generator" if ARGV[0] == "ENV=production"
  result += path
end

def write_root_index(overlay_templates)
  template = File.read("templates/index.html.erb")
  File.write(output_path("index.html"), ERB.new(template).result(binding))
end

def write_index_file(overlay_template)
  template = File.read("templates/overlay/index.html.erb")
  evaluated_template = ERB.new(template).result(binding)

  File.write(output_path("#{overlay_template["path"]}/index.html"), evaluated_template)
end

def generate_templates(overlay_templates)
  write_root_index(overlay_templates)

  overlay_templates.each do |overlay_template|
    FileUtils.mkdir_p output_path(overlay_template["path"])
    write_index_file(overlay_template)
  end
end

def copy_directory(name)
  FileUtils.cp_r(name, output_path(""))
end

overlay_templates =  YAML.load(File.read("config.yml"))["overlay_templates"]

FileUtils.rmtree "generated/**/*.*"
generate_templates(overlay_templates)
copy_directory("images")
copy_directory("javascript")
