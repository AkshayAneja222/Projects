package com.game.connect4.Entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name ="player_Moves")
public class Moves {
	
	@Id
	@Column(name="player_moves_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String token;
	private String player;
	private int move_played;
	
	
	public String getToken() {
		return token;
	}
	public void setToken(String token) {
		this.token = token;
	}
	public String getPlayer() {
		return player;
	}
	public void setPlayer(String player) {
		this.player = player;
	}
	public int getMove_played() {
		return move_played;
	}
	public void setMove_played(int move_played) {
		this.move_played = move_played;
	}

	public Moves(String token, String player, int move_played) {
		super();
		this.player = player;
		this.move_played = move_played;
		this.token = token;
	}
	public Moves() {
		super();
	}
	
}
