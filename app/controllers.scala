package controllers

import play._
import play.mvc._


object Application extends Controller {

    import views.Application._

    def index = {
        html.index("Scala Tennis")
    }

    def test = Html("<h1>Hello world!</h1>")
    def chat = Redirect("http://pure-warrior-8708.herokuapp.com/")

}