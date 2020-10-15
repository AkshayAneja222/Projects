package com.game.connect4.Entity;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.annotations.GenericGenerator;

@Entity
@Table(name = "match_Data")
public class Match {
	@Id
	@GeneratedValue(generator = "uuid")
	@GenericGenerator(name = "uuid", strategy = "uuid2")
	@Column(name = "token")
	private String token;
	
	public String getToken() {
		return token;
	}

	@Column
	private String firstUser;
	@Column
	private String secondUser;
	
	private String status;
	
	private String winner;

	public String getFirstUser() {
		return firstUser;
	}

	public void setFirstUser(String firstUser) {
		this.firstUser = firstUser;
	}

	public String getSecondUser() {
		return secondUser;
	}

	public void setSecondUser(String secondUser) {
		this.secondUser = secondUser;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getWinner() {
		return winner;
	}

	public void setWinner(String winner) {
		this.winner = winner;
	}

	public Match(String firstUser, String secondUser, String status, String winner) {
		super();
		this.firstUser = firstUser;
		this.secondUser = secondUser;
		this.status = status;
		this.winner = winner;
	}
	
	public Match() {};
}
