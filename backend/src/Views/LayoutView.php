<?php


namespace Views;


class LayoutView extends BaseView
{
    private $content;
    /** @var string */
    private $username = "";


    /**
     * LayoutView constructor.
     */
    public function __construct()
    {
    }


    public function render()
    {
        return $this->getTemplateHead() . $this->content . $this->templateFoot;
    }


    public function getTemplateHead()
    {
        return '
    
            <!doctype html>
            <html lang="en">
              <head>
                <!-- Required meta tags -->
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
            
                <!-- Bootstrap CSS -->
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
            
                <title>Hello, world!</title>
              </head>
              <body>
            
            <p></p>
            <div class="container">
            
                ';
    }

    private $templateFoot = '
    </div>
      </body>
</html>
    ';

    public function setContent($content): void
    {
        $this->content = $content;
    }

    public function setUsername(string $login): void
    {
        $this->username = $login;
    }
}
