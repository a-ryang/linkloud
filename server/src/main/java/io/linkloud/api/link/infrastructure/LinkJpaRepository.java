package io.linkloud.api.link.infrastructure;

import org.springframework.data.jpa.repository.JpaRepository;

public interface LinkJpaRepository extends JpaRepository<LinkEntity,Long> {

}
