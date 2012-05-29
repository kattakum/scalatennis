
                    package views.html

                    import play.templates._
                    import play.templates.TemplateMagic._
                    import views.html._

                    object main extends BaseScalaTemplate[Html,Format[Html]](HtmlFormat) {

                        def apply/*1.2*/(title:String = "")(body: => Html):Html = {
                            try {
                                _display_ {

format.raw/*1.36*/("""

<!DOCTYPE html>
<html>
    <head>
    	<meta http-equiv="content-type" content="text/html; charset=UTF-8">
        <title>""")+_display_(/*7.17*/title)+format.raw/*7.22*/("""</title>
        <link rel="stylesheet" type="text/css" href="""")+_display_(/*8.55*/asset("public/stylesheets/main.css"))+format.raw/*8.91*/("""" >
        <link rel="shortcut icon" type="image/png" href="""")+_display_(/*9.59*/asset("public/images/favicon.png"))+format.raw/*9.93*/("""">
        <script src="""")+_display_(/*10.23*/asset("public/javascripts/jquery-1.6.4.min.js"))+format.raw/*10.70*/("""" type="text/javascript"></script>
        <script src="""")+_display_(/*11.23*/asset("public/javascripts/tennis.js"))+format.raw/*11.60*/("""" type="text/javascript"></script>
    </head>
    <body>
        """)+_display_(/*14.10*/body)+format.raw/*14.14*/(""" <!--""")+_display_(/*14.20*/body)+format.raw/*14.24*/("""とはindex.scalaの""")+_display_(/*14.39*/main)+format.raw/*14.43*/("""の｛　｝括弧内のこと-->
    </body>
</html>
""")}
                            } catch {
                                case e:TemplateExecutionError => throw e
                                case e => throw Reporter.toHumanException(e)
                            }
                        }

                    }

                
                /*
                    -- GENERATED --
                    DATE: Mon May 28 19:26:25 PDT 2012
                    SOURCE: /app/views/main.scala.html
                    HASH: 65a9eb1e98abfdb264046c8f56440d1fe152e9fd
                    MATRIX: 316->1|457->35|608->160|633->165|722->228|778->264|866->326|920->360|972->385|1040->432|1124->489|1182->526|1276->593|1301->597|1334->603|1359->607|1401->622|1426->626
                    LINES: 10->1|14->1|20->7|20->7|21->8|21->8|22->9|22->9|23->10|23->10|24->11|24->11|27->14|27->14|27->14|27->14|27->14|27->14
                    -- GENERATED --
                */
            
