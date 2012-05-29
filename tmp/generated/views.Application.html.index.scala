
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
　　	<audio id="audio_gamestart"><source src="http://kattakum.heteml.jp/html5/get.mp3"></audio>
    <audio id="audio_loss"><source src="http://kattakum.heteml.jp/html5/kira.mp3"></audio>
    <audio id="audio_win"><source src="http://kattakum.heteml.jp/html5/kira.mp3"></audio>
    <audio id="audio_playstart"><source src="http://kattakum.heteml.jp/html5/get.mp3"></audio>
    <audio id="audio_stroke"><source src="http://kattakum.heteml.jp/html5/pi.mp3"></audio>
    <audio id="audio_wallhit"><source src="http://kattakum.heteml.jp/html5/pi.mp3"></audio>
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
                    DATE: Mon May 28 19:40:31 PDT 2012
                    SOURCE: /app/views/Application/index.scala.html
                    HASH: 25e092aeb7d321ecbed9189ba26caee03b959196
                    MATRIX: 329->1|450->15|478->18|497->29|517->31
                    LINES: 10->1|14->1|16->3|16->3|16->3
                    -- GENERATED --
                */
            
