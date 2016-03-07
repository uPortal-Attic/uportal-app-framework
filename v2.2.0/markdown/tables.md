MyUW tables add little to the tables provided by Bootstrap. All tables should be given a class of .table. Prefer responsive tables (achieved by surrounding your <table> element with a div with a class of .table-responsive).

<h4 class="center">UW 2014 Football Roster</h4>

<div class="table-responsive">
    <table class="table table-striped">
      <thead><tr><th>#</th><th>Name</th><th>Position</th><th>Height</th><th>Weight</th><th>Class</th><th>Hometown</th></tr><tr></tr></thead>
      <tbody><tr><td>1</td><td>A.J. Jordan</td><td>CB</td><td>6-0</td><td>178</td><td>JR</td><td>Dayton, OH</td></tr>
      <tr><td>2</td><td>Joel Stave</td><td>QB</td><td>6-5</td><td>225</td><td>JR</td><td>Greenfield, WI</td></tr>
      <tr><td>3</td><td>Kenzel Doe</td><td>WR</td><td>5-8</td><td>170</td><td>SR</td><td>Reidsville, NC</td></tr>
      <tr><td>4</td><td>Devin Gaulden</td><td>CB</td><td>5-10</td><td>180</td><td>JR</td><td>Miramar, FL</td></tr>
      <tr><td>5</td><td>Darius Hillary</td><td>CB</td><td>5-11</td><td>187</td><td>JR</td><td>Cincinnati, OH</td></tr>
      <tr><td>5</td><td>Tanner McEvoy</td><td>QB</td><td>6-6</td><td>223</td><td>JR</td><td>Hillsdale, NJ</td></tr>
      <tr><td>6</td><td>Corey Clement</td><td>RB</td><td>5-11</td><td>210</td><td>SO</td><td>Glassboro, NJ</td></tr>
      <tr><td>6</td><td>Alec James</td><td>DE</td><td>6-4</td><td>239</td><td>FR</td><td>Brookfield, WI</td></tr>
      <tr><td>7</td><td>Michael Caputo</td><td>S</td><td>6-1</td><td>206</td><td>JR</td><td>Imperial, PA</td></tr>
      <tr><td>7</td><td>D.J. Gillins</td><td>QB</td><td>6-3</td><td>185</td><td>FR</td><td>Jacksonville, FL</td></tr>
    </tbody></table>
  </div>