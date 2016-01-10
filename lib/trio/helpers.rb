require 'pathname'

# get current working directory basename
module Trident
  module GetCurrentDirectoryBasename
    def get_current_directory_basename(project_name)
      case project_name
      when "."
        # print working directory basename
        project_name = Pathname.new(Dir.pwd).basename
      end
      return project_name
    end
  end
end

# see if project exist
module Trident
  module ProjectExist
    def project?(project)
      if !File.directory?( project )
        puts ""
        puts "obi: The project [ #{project} ] doesn't exist"
        puts ""
        exit
      end
    end
  end
end