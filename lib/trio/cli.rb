require 'thor'
require 'trio/helpers'

module Trio
  class CLI < Thor
    include Thor::Actions
    include Trio::GetCurrentDirectoryBasename
    include Trio::ProjectExist

    desc "init [option]", "Initialize trio"

    method_option :wordpress, :aliases => "-w", :type => :string,  :desc => "Add trio to a Wordpress theme folder"
    method_option :middleman, :aliases => "-m", :type => :boolean, :desc => "Add trio to a Middleman project folder"

    def init()

      if options.length == 1

        if options[:middleman]

          trio_path = File.join('source', 'trio')

          self.trio_exist? trio_path

          self.add_trio trio_path, File.join('.')

          gsub_file 'gulpfile.js', /{{ trio }}/,  trio_path  unless !File.exists? 'gulpfile.js'

          gsub_file 'config.rb',   /(')(img|css|js)(')/,  '\1trio/\2\3'  unless !File.exists? 'config.rb'

          [
            /\s*activate\s:external_pipeline*/,
            /\s*name:\s.*gulp.*/,
            /\s*command:\s.*gulp.*/,
            /\s*source:\s.*tmp\/dist.*/
          ].each do |line|

            uncomment_lines 'config.rb', line

          end

          run 'npm install' unless !File.exists? 'package.json'

        elsif options[:wordpress]

          theme_path = File.join('wp-content', 'themes', options[:wordpress])
          trio_path  = File.join(theme_path , 'trio')

          self.trio_exist? trio_path

          self.show_message 'provide_wordpress_theme', 'red' unless  options[:wordpress] != 'wordpress'

          if File.directory?(theme_path)

            self.add_trio trio_path, '.'

            gsub_file 'gulpfile.js', /{{ trio }}/, trio_path unless !File.exists? 'gulpfile.js'

            inside trio_path do

              ['css', 'js', 'sass'].each do |dir|

                remove_dir(dir)

              end
            end
          else

            self.show_message 'no_wordpress_theme', 'red', options[:wordpress]
          end
        end

      elsif options.length == 0

        trio_path  = File.join('trio')

        self.trio_exist? trio_path

        self.add_trio trio_path, '.'

        gsub_file 'gulpfile.js', /{{ trio }}/, trio_path unless !File.exists? 'gulpfile.js'
      else

        self.show_message 'trio_options', 'red'
      end

    end

    no_commands do

      def add_trio trio_path, project_path

        FileUtils.copy_entry(File.join(__dir__, 'project'), project_path)
        FileUtils.copy_entry(File.join(__dir__, 'framework'), trio_path)

      end

      def trio_exist? trio_path

        if File.directory? trio_path

          self.show_message 'trio_exist', 'red'
        end

        true
      end

      def show_message message, color, argument = nil

        messages = {
          trio_exist:              "This project already contains a trio folder. Please try another project",
          trio_options:            "init expects no more than one option",
          no_wordpress_theme:      sprintf("could not find a directory in the themes folder by the name of %s", argument),
          provide_wordpress_theme: "please provide the theme folder name, example: trio init -w [theme_folder_name]",
        }

        say "\ntrio: #{messages[message.to_sym]}", color.to_sym
        exit

      end
    end

    no_tasks do

      alias_method :i, :init
    end
  end
end
