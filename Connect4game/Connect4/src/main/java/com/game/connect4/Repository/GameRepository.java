package com.game.connect4.Repository;

import org.springframework.stereotype.Repository;

import com.game.connect4.Entity.Match;

import org.springframework.data.jpa.repository.JpaRepository;


@Repository
public interface GameRepository extends JpaRepository<Match, String>{

}
