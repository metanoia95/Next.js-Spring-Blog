package com.springtemplate.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.springtemplate.entity.Kanban;

@Mapper
public interface KanbanMapper {

	public List<Kanban> list(String pIdx);
	
	public int updateKanban(List<Kanban> list);
	
	public int deleteKanban(List<Kanban> list);

	
	
	
}
