
                    package views.Application.html

                    import play.templates._
                    import play.templates.TemplateMagic._
                    import views.html._

                    object index extends BaseScalaTemplate[Html,Format[Html]](HtmlFormat) {

                        def apply/*1.2*/(title:String):Html = {
                            try {
                                _display_ {

format.raw/*1.16*/("""

""")+_display_(/*3.2*/main(title)/*3.13*/ {format.raw/*3.15*/("""
　　	<audio id="audio_gamestart"><source src="""")+_display_(/*4.46*/asset("public/audio/get.mp3"))+format.raw/*4.75*/(""""></audio>
    <audio id="audio_loss"><source src="""")+_display_(/*5.42*/asset("public/audio/kira.mp3"))+format.raw/*5.72*/(""""></audio>
    <audio id="audio_win"><source src="""")+_display_(/*6.41*/asset("public/audio/kira.mp3"))+format.raw/*6.71*/(""""></audio>
    <audio id="audio_playstart"><source src="""")+_display_(/*7.47*/asset("public/audio/get.mp3"))+format.raw/*7.76*/(""""></audio>
    <audio id="audio_stroke"><source src="""")+_display_(/*8.44*/asset("public/audio/pi.mp3"))+format.raw/*8.72*/(""""></audio>
    <audio id="audio_wallhit"><source src="""")+_display_(/*9.45*/asset("public/audio/pi.mp3"))+format.raw/*9.73*/(""""></audio>
    <div id = "playarea">
    <span id="playscreen">
    <canvas id="gamefield" width=800 height="600"></canvas>
    </span>
    <div align="center">
    <span id="helptext">
    	<br><br><br><br>
    How to play<br>
　　<br>
    <b>[key]</b><br>
    <table>
    <tr><td width="40">Enter</td><td>Game start</td></tr>
    <tr><td>[S]</td><td>Sound on,off</td></tr>
    <tr><td>[G]</td><td>The number of player</td></tr>
    <tr><td>[←][A]</td><td>move left</td></tr>
    <tr><td>[→][D]</td><td>move right</td></tr>
    <tr><td>[↑][W]</td><td>move up</td></tr>
    <tr><td>[↓][X]</td><td>move down</td></tr>
    <tr><td>[Esc]</td><td>Exit</td></tr>
    </table>
    <br>
    <b>[Rule]</b><br>
    ・11pt winner<br>
    ・2pt change serve<br>
　  <br>
<br><br><br><br>
<font size="+1"><a href="http://kattakum.heteml.jp/home/">kattakum homepage</a></font>
    </span>
    </div>
    </div>
""")})}
                            } catch {
                                case e:TemplateExecutionError => throw e
                                case e => throw Reporter.toHumanException(e)
                            }
                        }

                    }

                
                /*
                    -- GENERATED --
                    DATE: Mon May 28 19:10:38 PDT 2012
                    SOURCE: /app/views/Application/index.scala.html
                    HASH: f5561dc7e6e72c1e5527eda9c853d9be220cf39e
                    MATRIX: 329->1|450->15|478->18|497->29|517->31|589->77|638->106|716->158|766->188|843->239|893->269|976->326|1025->355|1105->409|1153->437|1234->492|1282->520
                    LINES: 10->1|14->1|16->3|16->3|16->3|17->4|17->4|18->5|18->5|19->6|19->6|20->7|20->7|21->8|21->8|22->9|22->9
                    -- GENERATED --
                */
            
