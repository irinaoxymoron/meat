<?php 

	include("../vendor/autoload.php");

	use KubAT\PhpSimple\HtmlDomParser;

	function getTitle($html) {
		$title = $html->find('h1.promo__title',0);
		if ($title) {
			return $title->plaintext;
		}
	    return null;
	}

	function getFirstParagraph($html) {
		$text = $html->find('p.article__text',0);
		if ($text) {
			return $text->plaintext;
		}
	    return null;	
	}

	function getImg($html) {
		$img = $html->find('img.promo__banner',0);
		if ($img) {
			return $img->src;
		}
	    return null;		
	}

	if (empty($_GET['page'])) {
		$page = 1;
	} else {
		$page = $_GET['page'];
	}

	$dirfiles = array_diff(scandir('./articles'), array('..', '.'));

	$countArticles = count($dirfiles);

	$offset = 2;

	$maxPage = ceil($countArticles/$offset);

	if ($page<1 || $page>$maxPage) {
		return;
	}


	if ($page==1) {
		$previous = null;
		$next = '?page=2';
	} elseif ($page==$maxPage) {
		$previous = '?page='.(String)($maxPage-1);
		$next = null;
	} else {
		$previous = '?page='.(String)($page-1);
		$next = '?page='.(String)($page+1);
	}

	$start = ((int)$page - 1) * $offset;
	$articleFiles = array_slice($dirfiles, $start, $offset);

	$articles = [];

	foreach ($articleFiles as $key=>$filepath) {
		$html = HtmlDomParser::file_get_html('./articles/'.$filepath);
		$articles[$key]['href'] = 'articles/'.$filepath;
		$articles[$key]['title'] = getTitle($html);
		$articles[$key]['img'] = getImg($html);
		$articles[$key]['text'] = getFirstParagraph($html);

	}

 ?>
 