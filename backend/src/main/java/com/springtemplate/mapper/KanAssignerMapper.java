package com.springtemplate.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.springtemplate.entity.KanAssigner;

@Mapper
public interface KanAssignerMapper {

	public List<KanAssigner> reqKanAssinger(String kanIdx);
	
	public int updateKanAssigner(List<KanAssigner> assignerlist);
	
}
