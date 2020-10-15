package com.game.connect4.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.game.connect4.Entity.Moves;


@Repository
public interface MovesRepository extends JpaRepository<Moves, Long> {

	List<Moves> findAllBytoken(String token);
	
}
