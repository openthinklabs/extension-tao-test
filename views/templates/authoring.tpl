<?include('header.tpl')?>

<?if(get_data('error')):?>
	<div class="main-container">
		<div class="ui-state-error ui-corner-all" style="padding:5px;">
			<?=__('Please select an test before!')?>
		</div>
		<br />
		<span class="ui-widget ui-state-default ui-corner-all" style="padding:5px;">
			<a href="#" onclick="selectTabByName('manage_tests');"><?=__('Back')?></a>
		</span>
	</div>
<?else:?>
	
	<div class="main-container" style="display:none;"></div>
	<div id="form-title" class="ui-widget-header ui-corner-top ui-state-default">
		<?=get_data('formTitle')?>
	</div>
	<div id="form-container" class="ui-widget-content ui-corner-bottom">
		<?=get_data('myForm')?>
	</div>
		
<?endif?>

<?include('footer.tpl')?>