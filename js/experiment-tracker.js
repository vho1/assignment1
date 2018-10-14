// Class used to track experiment
function count_clicks(clicks) {
	return clicks
}

class ExperimentTracker {


	constructor() {
		this.trials = [];
		this.attempt = 0;
		this.trial = null;
		this.attempt = null;
		this.menuType = null;
		this.menuDepth = null;
		this.inputMethod = null;
		this.targetItem = null;
		this.selectedItem = null;
		this.startTime = null;
		this.endTime = null;
		this.clicks = 0;
	}
	
	resetTimers(){
		this.startTime = null;
		this.endTime = null;
		this.clicks = 0;
	}

	startTimer() {
		this.startTime = Date.now();
		this.clicks = 0;
		this.countClicks();
	}

	recordSelectedItem(selectedItem) {
		this.selectedItem = selectedItem;
		this.stopTimer();
	}

	countClicks() {
		
		function getCountClicks() {
			this.clicks ++;
		}
		document.onclick = getCountClicks
	}

	stopTimer() {
		
		this.endTime = Date.now();
		this.trials.push([this.trial, this.attempt, this.menuType, this.menuDepth, this.inputMethod, this.targetItem, this.selectedItem, this.startTime, this.endTime, count_clicks(this.clicks)])
		this.resetTimers();
		this.attempt++;

	}

	newTrial() {
		this.attempt = 1;
	}

	toCsv() {
		var csvFile = "Participant No, Trial,Attempt,Menu Type,Menu Depth,Input Method,Target Item,Selected Item,Start Time, End Time, Clicks\n";
		for (var i = 0; i < this.trials.length; i++) {
			csvFile += this.trials[i].join(',');
			csvFile += "\n";
		}

		var hiddenLink = document.createElement('a');
		hiddenLink.href = 'data:text/csv;charset=utf-8,' + encodeURI(csvFile);
		hiddenLink.target = '_blank';
		hiddenLink.download = 'experiment.csv';
		document.body.appendChild(hiddenLink);
		hiddenLink.click();
	}


}