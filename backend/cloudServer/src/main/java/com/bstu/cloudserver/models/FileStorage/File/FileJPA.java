package com.bstu.cloudserver.models.FileStorage.File;

import org.hibernate.annotations.Entity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


@Entity
public interface FileJPA extends JpaRepository<File, Long>
{

}


