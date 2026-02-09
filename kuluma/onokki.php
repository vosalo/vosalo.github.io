<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="en">
<?php
	$filepath = __FILE__;
	require_once "top.php";
?>
<body>
<h1>onokki</h1>

<p><a href="onokki.zip">onokki</a> is a multiplayer hotseat one-key game.</p>

<p>The version linked has two players, and AFAIK cannot be changed without recompiling (and I do not have the source code any longer). The keys are 1 and Enter. What the one key does is kind of crazy, so the game takes some time to learn, but you can go more or less where you please once you master it.</p>

<p>In the game, you control a big ball and several small balls. When you do not press the button, the big ball goes forward, and the little ones accelerate towards it (along a geodesic in Euclidean space). When you press the button, the large ball accelerates toward the mass center of the little balls <em>along an L∞ geodesic</em>, that is, diagonally. This was originally a bug, but in fact it turns out that it is essentially impossible to control the balls if Euclidean geodesics are used also for the large ball -- this is because you quickly deadlock on a one-dimensional subspace, whereas now deadlock is only possible on diagonal lines, thus rare. The level's colors also affect movement to some degree.</p>

<p>If a big ball hits a small ball, the small ball disappears and the big ball is dealt damage. If the big ball runs out of health (indicated by its central color), its controller loses. If a player runs out of small balls, their controller loses. You gain more health from small pink balls, and gain more small balls from small white balls, which are generated at the center of the level. There is also an easter egg, which triggers in a certain situation.</p>

<p>I'm happy to receive questions about the game at vosalo(at)utu.fi.</p>

<p>Latest update July 28th, 2017.</p>
</body>
</html>


