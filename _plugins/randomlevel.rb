module Jekyll
  class RandomLevel < Liquid::Tag
    def render(context)
      level = ['default', 'primary', 'success', 'warning', 'danger', 'info'].shuffle.sample
      "#{level}"
    end
  end
end

Liquid::Template.register_tag('random_level', Jekyll::RandomLevel)