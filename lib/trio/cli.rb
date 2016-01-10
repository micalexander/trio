require 'Thor'
require 'trio/helpers'

module Trident
  class CLI < Thor
    include Thor::Actions
    include Trident::GetCurrentDirectoryBasename
    include Trident::ProjectExist

    desc "init [option]", "Initialize trio"

    method_option :wordpress, :aliases => "-w", :type => :string,  :desc => "Add trio to a Wordpress theme folder"
    method_option :middleman, :aliases => "-m", :type => :boolean, :desc => "Add trio to a Middleman project folder"

    def init()

      if !File.directory?('trio')

        if options.length <= 1

          if options[:middleman]

            trio_path = File.join('source', 'trio')

            self.add_trio trio_path, '.'

            gsub_file 'gulpfile.js', /trio/,  trio_path  unless !File.exists? 'gulpfile.js'

            gsub_file 'config.rb',   /(')(img|css|js)(')/,  '\1trio/\2\3'  unless !File.exists? 'config.rb'

            run 'npm install' unless !File.exists? 'package.json'

          elsif options[:wordpress]

            theme_path   = File.join('wp-content', 'themes', options[:wordpress])
            trio_path = File.join(theme_path , 'trio')

            if File.directory?(theme_path)

              self.add_trio trio_path '.'

              gsub_file 'gulpfile.js', /'trio'/, trio_path unless !File.exists? 'gulpfile.js'

              inside trio_path do

                ['css', 'js', 'sass',].each do |dir|

                  remove_dir(dir)

                end
              end
            else
              if options[:wordpress] == 'wordpress'
                puts
                puts "trio: please provide the theme folder name, example: trio init -w [theme_folder_name]"
                puts
                exit
              else
                puts
                puts "trio: could not find a directory in the themes folder by the name of #{options[:wordpress]}"
                puts
                exit
              end
            end
          else

            self.add_trio trio_path, 'source'

          end

        else
          puts
          puts "trio: init expects only one option"
          puts
          exit
        end
      else
        puts ""
        puts "Trident: This project already contains a trio folder. Please try again."
        puts ""
        exit
      end

    end

    no_commands do

      def add_trio trio_path, project_path

        FileUtils.copy_entry(File.join(__dir__, 'project'), project_path)
        FileUtils.copy_entry(File.join(__dir__, 'framework'), File.join(trio_path))

      end
    end

    no_tasks do
      alias_method :i, :init

    end
  end
end
