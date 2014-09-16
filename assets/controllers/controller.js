var CurPage = 'home';
var CurOptn = '';

function CheckURL() {
	// Get anything on the url after the #
	var urlhash = window.location.hash;
	
	// If there was something there
	if( urlhash != '' ) {
		// Drop the # from the string
		while( urlhash.charAt( 0 ) === '#' ) urlhash = urlhash.substr( 1 );
		
		// Validate the hash so it doesn't try to load fake stuff
		if( urlhash == 'char' || urlhash == 'gang' ) CreateForm( urlhash );
		else if( urlhash == 'svr' ) GetServers();
	}
}

function Animatus( html, NextPage, Optional ) {
	// Animate the current content out of the page
	$( '#current' ).hide( 'drop', 'easeOutQuart', 500, function() {
		// Callback sent after current content has animated out
		
		// Show the return button if it is hidden
		if( $( '#return' ).css( 'display' ) == 'none' ) $( '#return' ).css( 'display', 'block' );
		// The page just animated out was the Homepage
		if( CurPage == 'home' ) {
			// Update the return button so the user can go back to where they were
			$( '#return' ).off( 'click' ).click( function() { ReturnHome() } );
			$( '#return p' ).html( 'Return to Homepage' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was the Character Select Form
		} else if( CurPage == 'char-form' ) {
			// Update the return button so the user can go back to where they were
			$( '#return' ).off( 'click' ).click( function() { CreateForm( 'char' ) } );
			$( '#return p' ).html( 'Return to Character Select Form' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was the Gang Select Form
		} else if( CurPage == 'gang-form' ) {
			// Update the return button so the user can go back to where they were
			$( '#return' ).off( 'click' ).click( function() { CreateForm( 'gang' ) } );
			$( '#return p' ).html( 'Return to Gang Select Form' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was a Player Account Overview
		} else if( CurPage == 'account' ) {
			// Update the return button so the user can go back to where they were
			var a = CurOptn;
			$( '#return' ).off( 'click' ).click( function() { GetAccount( a ) } );
			$( '#return p' ).html( 'Return to ' + CurOptn + '\'s Account Overview' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was a Charcter Overview
		} else if( CurPage == 'character' ) {
			// Update the return button so the user can go back to where they were
			var a = CurOptn;
			$( '#return' ).off( 'click' ).click( function() { GetCharacter( a ) } );
			$( '#return p' ).html( 'Return to  ' + CurOptn + '\'s Character Overview' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was a Gang Overview
		} else if( CurPage == 'gang' ) {
			// Update the return button so the user can go back to where they were
			var a = CurOptn;
			$( '#return' ).off( 'click' ).click( function() { GetGang( a ) } );
			$( '#return p' ).html( 'Return to  ' + CurOptn + '\'s Gang Overview' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		
		// The page just animated out was the Server Overview
		} else if( CurPage == 'servers' ) {
			// Update the return button so the user can go back to where they were
			$( '#return' ).off( 'click' ).click( function() { ReturnHome() } );
			$( '#return p' ).html( 'Return to Server Overview' );
			
			// Note where we are now
			CurPage = NextPage;
			if( typeof Optional !== 'undefined' ) CurOptn = Optional;
		}
		
		// Empty the current content from the page
		$( '#content' ).html( '' );
		
		// Append, animate in and alter the new content's ID
		$( '#content' ).append( html );
		$( '#new' ).show( 'drop', 'easeInQuart', 500 );
		$( '#new' ).attr( 'id', 'current' );
	} );
}

function CreateForm( type ) {
	// Generate the form for picking a character or account
	if( type == 'char' ) {
		var html = '<section id="new" class="character-form char-form"> \
			<form> \
				<p>Enter a SteamID</p> \
				<input type="text" name="steam" placeholder="STEAM_0:0:..." /> \
				<p>Or Character Name</p> \
				<input type="text" name="char" placeholder="mercior..." /> \
				<br /> \
				<input type="submit"  /> \
			</form> \
		</section> \
		';
		// Form on submit event listener
		$( 'body' ).off( 'submit', '.char-form' ).on( 'submit', '.char-form', function( event ) { event.preventDefault(); SendForm( 'char' ) } );
		
		// Set active status to relevant nav button
		$( '#char-btn' ).addClass( 'active' );
		$( '#gang-btn' ).removeClass( 'active' );
		$( '#svr-btn' ).removeClass( 'active' );
			
		Animatus( html, 'char-form' );
	
	// Generate the form for picking a gang
	} else if( type == 'gang' ) {
		var html = '<section id="new" class="character-form gang-form"> \
			<form> \
				<p>Enter a Gang name</p> \
				<input type="text" name="gang" placeholder="Divinity..." /> \
				<br /> \
				<input type="submit"  /> \
			</form> \
		</section> \
		';
		// Form on submit event listener
		$( 'body' ).off( 'submit', '.gang-form' ).on( 'submit', '.gang-form', function( event ) { event.preventDefault(); SendForm( 'gang' ) } );
		
		// Set active status to relevant nav button
		$( '#char-btn' ).removeClass( 'active' );
		$( '#gang-btn' ).addClass( 'active' );
		$( '#svr-btn' ).removeClass( 'active' );
		
		Animatus( html, 'gang-form' );
	}
}

function SendForm( type ) {
	// Form validation
	if( type == 'char' ) {
		if( $( '.char-form input[ name="steam" ]' ).val() && $( '.char-form input[ name="char" ]' ).val() ) {
			alert( 'You may only search for 1 type at a time!' );
			return;
		}
		if( !$( '.char-form input[ name="steam" ]' ).val() && !$( '.char-form input[ name="char" ]' ).val() ) {
			alert( 'You need to enter search criteria before submitting!' );
			return;
		}
		
		if( $( '.char-form input[ name="steam" ]' ).val() ) {
			GetAccount( $( '.char-form input[ name="steam" ]' ).val() );
		} else {
			GetCharacter( $( '.char-form input[ name="char" ]' ).val() );
		}
	} else if( type == 'gang' ) {
		if( !$( '.gang-form input[ name="gang" ]' ).val() ) {
			alert( 'You need to enter search criteria before submitting!' );
			return;
		}
		
		GetGang( $( '.gang-form input[ name="gang" ]' ).val() );
	}
}

function GetAccount( steam ) {
	// Request JSON from remote API
	$.get( 'http://www.gangwarsrp.com/api/account/' + steam, function( data ) {
		// Ensure the AJAX request returns a result
		if( data.length == 0 ) {
			alert( 'Could not find an account with this SteamID' );
			return;
		}
		
		var html = '<section id="new">'; // HTML structure setup
		html += '<p class="overview-title">Character List For ' + steam + '</p>';
		
		var z = false; // List color zebra
		var i = 1;
		var j = [];
		// For each character in given SteamID
		$.each( data, function( k, v ) {
			// Character wrapper
			html += '<section id="' + i + '" class="overview';
			z == false ? html += '">' : html += ' even">';
			
			// Character head
			html += '<img src="assets/img/';
			v.race == 'robot' ? html += 'rhead' : html += 'hhead';
			html += v.skin.id + '.png" />';
			
			// Character name & level
			html += '<p class="name" style="color: rgb( ' + v.skin.color1 + ' ); text-shadow: 1px 1px 0 rgb( ' + v.skin.color2 + ' )">' + v.name;
			v.gang == null ? html += '</p>' : html += ' <span style="color: rgb( 120, 120, 120 ); text-shadow: none; font-weight: 0 )">of</span> <span style="color: rgb( ' + v.gang.color1 + ' ); text-shadow: 1px 1px 0 rgb( ' + v.gang.color2 + ' )">' + v.gang.name + '</span></p>';
			html += '<p class="level">' + v.level + '</p>';
			html += '</section>';
			
			// OnClick event handler
			$( 'body' ).off( 'click', '#' + i ).on( 'click', '#' + i, function() { GetCharacter( v.name ) } );
			
			// Loop values
			z = !z;
			i++;
		} );
		
		html += '</section>';
		
		Animatus( html, 'account', steam );
	} );
}

function GetCharacter( name ) {
	// Request JSON from remote API
	$.get( 'http://www.gangwarsrp.com/api/player/' + name, function( data ) {
		// Ensure the AJAX request returns a result
		if( data.length == 0 ) {
			alert( 'Could not find a character with this name' );
			return;
		}
		
		var html = '<section id="new">'; // HTML structure setup
		$.each( data, function( k, v ) {
			
			// Sub-navigation & button clicks
			html += '<nav class="character-nav"><ul><li id="btn-info">Information</li><li id="btn-cheevs" class="even">Achievements</li></ul></nav>';
			$( 'body' ).off( 'click', '#btn-info' )
				.off( 'click', '#btn-cheevs' )
				.on( 'click', '#btn-info', function() { SwapMenu( 'info' ) } )
				.on( 'click', '#btn-cheevs', function() { SwapMenu( 'cheevs' ) } );
			
			// Header
			html += '<p class="char-name" style="color: rgb( ' + v.skin.color1 + ' ); text-shadow: 1px 1px 0 rgb( ' + v.skin.color2 + ' )">' + v.name;
			v.gang == null ? html += '</p>' : html += ' <span style="color: rgb( 120, 120, 120 ); text-shadow: none; font-weight: 0 )">of</span> <span style="color: rgb( ' + v.gang.color1 + ' ); text-shadow: 1px 1px 0 rgb( ' + v.gang.color2 + ' )">' + v.gang.name + '</span></p>';
			
			// Character information
			html += '<section class="char-info">'
			html += '<section class="xp-bar"><section class="bar-inside" style="width: ' + Math.round( ( v.xp / ( 150 + ( Math.pow( v.level, 2 ) ) * 125 ) ) * 100 ) + '%"></section></section>';
			v.level == 99 ? html += '<p class="xp-text">Maximum Level</p>' : html += '<p class="xp-text">' +  Math.round( ( v.xp / ( 150 + ( Math.pow( v.level, 2 ) ) * 125 ) ) * 100 ) + '% to next level</p>';
			html += '<p>Race: ' + v.race + '</p>';
			html += '<p>Level: ' + v.level + '</p>';
			html += '<p>Money: ' + v.money + '</p>';
			html += '<p>Time Played: ' + v.time + ' Hours</p>';
			html += '<p>Date Created: ' + v.created + '</p>';
			html += '<p>Kills: ' + v.kills + '</p>';
			html += '<p>Weapons Crafted: ' + v.weapon_crafts + '</p>';
			html += '<p>Armor Pieces Crafted: ' + v.armor_crafts + '</p>';
			html += '<p>Epic Items Crafted: ' + v.epic_crafts + '</p>';
			if( v.gang != null ) {
				html += '<p class="char-gang-btn">View ' + v.name + '\'s gang information</p>';
				$( 'body' ).off( 'click', '.char-gang-btn' ).on( 'click', '.char-gang-btn', function() { GetGang( v.gang.name ) } );
			}
			html += '</section>';
			
			// Character achievements
			html += '<section class="char-cheevs">';
			z = false;
			$.each( v.achievements, function( k, v ) {
				html += '<section class="cheev';
				z == true ? html += ' even">' : html += '">';
				html += '<p class="cheev-name">' + v.name + '</p>';
				
				// Achievement detail validation
				if( v.desc != null ) {
					html += '<p class="cheev-desc">' + v.desc + '</p>';
					html += '<section class="cheev-bar"><section style="width: ' + ( v.progress / v.max ) * 100 + '%"></section></section>';
					( v.progress / v.max ) * 100 == 100 ? html += '<p class="cheev-text">Achievement Completed</p>' : html += '<p class="cheev-text">' + Math.round( ( v.progress / v.max ) * 100 ) + '% Completed</p>';
				} else {
					html += '<p class="cheev-desc">No information recieved about specified achievement</p>';
				}
				
				html += '</section>';
				z = !z;
			} );
			
			html += '</section></section>';
		} );
		
		Animatus( html, 'character', name );
	} );
}

function SwapMenu( cur ) {
	// Current menu open is Character Info
	if( cur == 'info' ) {
		if( $( '.char-info' ).css( 'display' ) != 'none' ) return;
	
		// Set active status to relevant nav button
		$( '#btn-cheevs' ).removeClass( 'active' );
		$( '#btn-info' ).addClass( 'active' );
		
		// animate
		$( '.char-cheevs' ).hide( 'drop', 'easeOutQuart', 400, function() {
			$( '.char-info' ).show( 'drop', 'easeInQuart', 400 );
		} );
	
	// Current menu open is Character Achievements
	} else if( cur == 'cheevs' ) {
		if( $( '.char-cheevs' ).css( 'display' ) != 'none' ) return;
	
		// Set active status to relevant nav button
		$( '#btn-info' ).removeClass( 'active' );
		$( '#btn-cheevs' ).addClass( 'active' );
		
		// animate
		$( '.char-info' ).hide( 'drop', 'easeOutQuart', 400, function() {
			$( '.char-cheevs' ).show( 'drop', 'easeInQuart', 400 );
		} );
	
	// Current menu open is Gang Info
	} else if( cur == 'ginfo' ) {
		if( $( '.gang-info' ).css( 'display' ) != 'none' ) return;
	
		// Set active status to relevant nav button
		$( '#btn-gmbrs' ).removeClass( 'active' );
		$( '#btn-gugrds' ).removeClass( 'active' );
		$( '#btn-ginfo' ).addClass( 'active' );
		
		// animate
		if( $( '.gang-members' ).css( 'display' ) == 'none' ) {
			$( '.gang-upgrades' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-info' ).show( 'drop', 'easeInQuart', 400 );
			} );
		} else {
			$( '.gang-members' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-info' ).show( 'drop', 'easeInQuart', 400 );
			} );
		}
	
	// Current menu open is Gang Members
	} else if( cur == 'gmbrs' ) {
		if( $( '.gang-members' ).css( 'display' ) != 'none' ) return;
	
		// Set active status to relevant nav button
		$( '#btn-ginfo' ).removeClass( 'active' );
		$( '#btn-gugrds' ).removeClass( 'active' );
		$( '#btn-gmbrs' ).addClass( 'active' );
		
		// animate
		if( $( '.gang-info' ).css( 'display' ) == 'none' ) {
			$( '.gang-upgrades' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-members' ).show( 'drop', 'easeInQuart', 400 );
			} );
		} else {
			$( '.gang-info' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-members' ).show( 'drop', 'easeInQuart', 400 );
			} );
		}
	
	// Current menu open is Gang Upgrades
	} else if( cur == 'gugrds' ) {
		if( $( '.gang-upgrades' ).css( 'display' ) != 'none' ) return;
	
		// Set active status to relevant nav button
		$( '#btn-gmbrs' ).removeClass( 'active' );
		$( '#btn-ginfo' ).removeClass( 'active' );
		$( '#btn-gugrds' ).addClass( 'active' );
		
		// animate
		if( $( '.gang-members' ).css( 'display' ) == 'none' ) {
			$( '.gang-info' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-upgrades' ).show( 'drop', 'easeInQuart', 400 );
			} );
		} else {
			$( '.gang-members' ).hide( 'drop', 'easeOutQuart', 400, function() {
				$( '.gang-upgrades' ).show( 'drop', 'easeInQuart', 400 );
			} );
		}
	}
}

function GetGang( gang ) {
	// Request JSON from remote API
	$.get( 'http://www.gangwarsrp.com/api/gang/' + gang, function( data ) {
		// Ensure the AJAX request returns a result
		if( data.length == 0 ) {
			alert( 'Could not find a gang with this name' );
			return;
		}
		
		var html = '<section id="new">'; // HTML structure setup
		
		// Sub-navigation & button clicks
		html += '<nav class="gang-nav"><ul><li id="btn-ginfo">Information</li><li id="btn-gmbrs" class="even">Members</li><li id="btn-gugrds">Upgrades</li></ul></nav>';
		$( 'body' ).off( 'click', '#btn-ginfo' )
			.off( 'click', '#btn-gmbrs' )
			.off( 'click', '#btn-gugrds' )
			.on( 'click', '#btn-ginfo', function() { SwapMenu( 'ginfo' ) } )
			.on( 'click', '#btn-gmbrs', function() { SwapMenu( 'gmbrs' ) } )
			.on( 'click', '#btn-gugrds', function() { SwapMenu( 'gugrds' ) } );
		
		// Gang name & level
		html += '<p class="gang-name" style="color: rgb( ' + data.color1 + ' ); text-shadow: 1px 1px 0 rgb( ' + data.color2 + ' )">' + data.name + '</p>';
		html += '<p class="gang-level">Level ' + data.level + ' Gang</p>';
		
		// Gang info
		html += '<section class="gang-info">';
		html += '<p>Created by: ' + data.creator + '</p>';
		html += '<p>Money: ' + data.money + '</p>';
		html += '<p>' + data.points + ' Points</p>';
		html += '<p>Won ' + data.wars_won + ' Wars</p>';
		html += '<p>Lost ' + data.wars_lost + ' Wars</p>';
		html += '<p>Got to the top 3 in ' + data.seasons_won + ' Gang Season(s)</p>';
		html += '</section>';
		
		// Gang members
		html += '<section class="gang-members">';
		var z = false;
		$.each( data.members, function( k, v ) {
			html += '<section id="M' + k + '" class="member-plate';
			z == true ? html += ' even">' : html += '">';
			html += '<p>' + v.name + '</p>';
			html += '<p>' + v.rank + '</p>';
			html += '</section>';
			$( 'body' ).off( 'click', '#M' + k ).on( 'click', '#M' + k, function() { GetCharacter( v.name ) } );
			z = !z;
		} );
		html += '</section>';
		
		// Gang upgrades
		html += '<section class="gang-upgrades">';
		
		// HP Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Gang Heart</p>';
		html += '<p class="upgrade-desc">Increase the max health of all your gangmembers</p>';
		html += '<p>Level ' + data.upgrades.hp_boost + '</p>';
		html += '</section>';
		
		// Armor Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Gang Shield</p>';
		html += '<p class="upgrade-desc">Increases the max armor of all your gangmembers</p>';
		html += '<p>Level ' + data.upgrades.armor_boost + '</p>';
		html += '</section>';
		
		// Regen
		html += '<section class="upgrade-plate">';
		html += '<p>Street Spirit</p>';
		html += '<p class="upgrade-desc">Give your gangmembers regenerating health</p>';
		html += '<p>Level ' + data.upgrades.regen + '</p>';
		html += '</section>';
		
		// XP Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Made Man</p>';
		html += '<p class="upgrade-desc">Increase the XP boost of all your gangmembers</p>';
		html += '<p>Level ' + data.upgrades.xp_boost + '</p>';
		html += '</section>';
		
		// Speed Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Streetwise</p>';
		html += '<p class="upgrade-desc">Speed up your gangmembers</p>';
		html += '<p>Level ' + data.upgrades.speed_boost + '</p>';
		html += '</section>';
		
		// Print Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Goldfinger</p>';
		html += '<p class="upgrade-desc">Increase the output of your money printers</p>';
		html += '<p>Level ' + data.upgrades.print_boost + '</p>';
		html += '</section>';
		
		// Drug Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Sticky Fingers</p>';
		html += '<p class="upgrade-desc">Learn to grow drugs faster</p>';
		html += '<p>Level ' + data.upgrades.drug_boost + '</p>';
		html += '</section>';
		
		// Drop Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Charmed</p>';
		html += '<p class="upgrade-desc">Increases your gangmembers luck</p>';
		html += '<p>Level ' + data.upgrades.drop_boost + '</p>';
		html += '</section>';
		
		// Member Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Expansion</p>';
		html += '<p class="upgrade-desc">Allow more members to join the gang</p>';
		html += '<p>Level ' + data.upgrades.member_boost + '</p>';
		html += '</section>';
		
		// Shop Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Five Finger Discount</p>';
		html += '<p class="upgrade-desc">Get discount prices on items in the gang shop</p>';
		html += '<p>Level ' + data.upgrades.shop_boost + '</p>';
		html += '</section>';
		
		// Ghost Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Invincible</p>';
		html += '<p class="upgrade-desc">Reduce the ghost time of your gang members</p>';
		html += '<p>Level ' + data.upgrades.ghost_boost + '</p>';
		html += '</section>';
		
		// Pickpocket Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Hustler</p>';
		html += '<p class="upgrade-desc">Increase the money your gangmembers collect when pickpocketing</p>';
		html += '<p>Level ' + data.upgrades.pickpocket_boost + '</p>';
		html += '</section>';
		
		// Bank Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Wall Street</p>';
		html += '<p class="upgrade-desc">Increase the money gang members get from their bank deposits</p>';
		html += '<p>Level ' + data.upgrades.bank_boost + '</p>';
		html += '</section>';
		
		// Mission Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Goodfella</p>';
		html += '<p class="upgrade-desc">Gang members get more XP when completing quests</p>';
		html += '<p>Level ' + data.upgrades.mission_boost + '</p>';
		html += '</section>';
		
		// Gang XP Boost
		html += '<section class="upgrade-plate">';
		html += '<p>Wise Guys</p>';
		html += '<p class="upgrade-desc">Your gang will earn more XP overall</p>';
		html += '<p>Level ' + data.upgrades.gang_xp_boost + '</p>';
		html += '</section>';
		
		// Cap Boost
		html += '<section class="upgrade-plate even">';
		html += '<p>Gang Land</p>';
		html += '<p class="upgrade-desc">Gangmembers can capture territory poles faster</p>';
		html += '<p>Level ' + data.upgrades.cap_boost + '</p>';
		html += '</section>';
			
		html += '</section>';
		
		html += '</section>';
		
		Animatus( html, 'gang', gang );
	} );
}

function GetServers() {
	// Request JSON from remote API
	$.get( 'http://www.gangwarsrp.com/api/servers', function( data ) {
		var html = '<section id="new">'; // HTML structure setup
		var z = false;
		$.each( data, function( k, v ) {
			if( v.name == 'Developer Server' ) return;
			html += '<section class="server-plate';
			z == true ? html += ' even">' : html += '">';
			html += '<p>' + v.name + ' (' + v.min_level + ' - ' + v.max_level + ')</p>';
			html += '<p>' + v.server_uptime;
			v.server_uptime == 1 ? html += ' Hour Online</p>' : html += ' Hours Online</p>';
			html += '<section class="server-bar"><section style="width: ' + ( v.current_players / 24 ) * 100 + '%"></section></section>';
			html += '<p>' + v.current_players + ' / 24 Players</p>';
			html += '</section>';
			
			z = !z;
		} );
		html += '</section>';
		
		$( '#char-btn' ).removeClass( 'active' );
		$( '#gang-btn' ).removeClass( 'active' );
		$( '#svr-btn' ).addClass( 'active' );
		
		Animatus( html, 'servers' );
	} );
}

function ReturnHome() {
	var html = ' \
		<section id="new" class="intro-text"> \
			<p>Welcome to GangWars Companion!</p> \
			<br /> \
			<p>Click a navigation button to begin</p> \
		</section> \
	';
	
	$( '#char-btn' ).removeClass( 'active' );
	$( '#gang-btn' ).removeClass( 'active' );
	$( '#svr-btn' ).removeClass( 'active' );
	
	Animatus( html, 'home' );
}

$( document ).ready( function() {
	$( '#logo' ).on( 'click', function() { ReturnHome() } );
	$( '#char-btn' ).on( 'click', function() { CreateForm( 'char' ) } );
	$( '#gang-btn' ).on( 'click', function() { CreateForm( 'gang' ) } );
	$( '#svr-btn' ).on( 'click', function() { GetServers() } );
	
	CheckURL();
} );