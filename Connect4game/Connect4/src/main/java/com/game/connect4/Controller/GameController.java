package com.game.connect4.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.game.connect4.Entity.Match;
import com.game.connect4.Entity.Moves;
import com.game.connect4.Repository.GameRepository;
import com.game.connect4.Repository.MovesRepository;
import com.game.connect4.Services.GameBoard;

@RestController
@RequestMapping("/game")
public class GameController {

	Map<String, GameBoard> map = new HashMap<String, GameBoard>();

	@Autowired
	private GameRepository gameRepository;

	@Autowired
	private MovesRepository movesRepository;

	@GetMapping(value = "/allMatches", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody List<Match> getAllMatches() {
		return gameRepository.findAll();
	}

	@GetMapping(value = "/start", produces = MediaType.APPLICATION_JSON_VALUE)
	public @ResponseBody Match startMatch() {
		Match match = new Match("Yellow", "Red", "Ready", "");
		match = gameRepository.save(match);
		String token = match.getToken();
		map.put(token, new GameBoard());
		return match;
	}

	@GetMapping(value = "/start/{token}/{user}/{column}", produces = MediaType.APPLICATION_JSON_VALUE)
	public String playMove(@PathVariable(value = "token") String token, @PathVariable(value = "user") String user,
			@PathVariable(value = "column") int column) {
		GameBoard game = map.get(token);

		if (game == null)
			return "No such live game! start new game";

		String result = game.dropCoin(column, user);

		if ("winner".equalsIgnoreCase(result)) {
			map.remove(token);
			result = user + " wins";
			Match match = gameRepository.getOne(token);
			match.setStatus("Over");
			match.setWinner(user);
			gameRepository.save(match);
		} else if ("draw".equalsIgnoreCase(result)) {
			map.remove(token);
			Match match = gameRepository.getOne(token);
			match.setStatus("It is a Draw");
			match.setWinner("Draw");
			gameRepository.save(match);
		} else if ("invalid".equalsIgnoreCase(result)) {
			return result;
		}

		movesRepository.save(new Moves(token, user, column));

		return result;
	}

	@GetMapping(value = "/start/{token}/allMoves")
	public @ResponseBody List<Moves> getMovesByToken(@PathVariable(value = "token") String token) {
		return movesRepository.findAllBytoken(token);
	}

}
