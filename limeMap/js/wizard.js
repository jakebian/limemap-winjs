function newWizard(submap,MAP){
		var point;
		$('.next').click(function(e){
			e.preventDefault();
			$(this).addClass('chosen');
			$(this).siblings().removeClass('chosen');
			$( "#guide" ).wizard("forward");
		})
		function choose($step, action){
			var branch = $step.children('.chosen').data('next');
			return branch;
		}

		$("#guide").wizard({
			transitions: {
				start: choose,
				onsite: choose,
				offsite: choose,
				details: function(){
					name=$('#place-name').val();
					desc = $('#place-desc').val();
                    
					console.log(point.pos());
                    //ADD TO DATABASE HERE!
				},

				adding: function($step, action){
					var branch = $step.children('.chosen').data('next');
					if(branch=='offsite'){
						point=MAP.addDragPin(MAP.getCenter());
					}
					if(branch=='onsite'){
						point=MAP.addDragPin([0,0]);
					}
					return branch;
				},

			}
		});
}
