package com.youcode.aftas_backend.services.Impl;

import com.youcode.aftas_backend.exceptions.PointsValidationException;
import com.youcode.aftas_backend.exceptions.ResourceNotFoundException;
import com.youcode.aftas_backend.models.dto.LevelDto;
import com.youcode.aftas_backend.models.entities.Level;
import com.youcode.aftas_backend.repositories.LevelRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.mockito.junit.jupiter.MockitoSettings;
import org.mockito.quality.Strictness;
import org.modelmapper.ModelMapper;
import static org.junit.jupiter.api.Assertions.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.mockito.BDDMockito.given;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.BDDMockito.willDoNothing;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
@MockitoSettings(strictness = Strictness.LENIENT)
public class LevelServiceImplTest {

    @Mock
    private LevelRepository levelRepository;

    @Mock
    private ModelMapper modelMapper;

    @InjectMocks
    private LevelServiceImpl levelService;

    private Level level;

    private LevelDto levelDto;

    @BeforeEach
    public void setUp() {
        level = Level.builder()
                .code(1)
                .description("level description")
                .points(50)
                .build();

        levelDto = new LevelDto();
        levelDto.setCode(1);
        levelDto.setDescription("level dto description");
        levelDto.setPoints(30);
    }

    @DisplayName("Test create level method in a success scenario")
    @Test
    public void testSuccessCreate() {
        given(modelMapper.map(levelDto, Level.class)).willReturn(level);
        given(modelMapper.map(level, LevelDto.class)).willReturn(levelDto);
        given(levelRepository.save(level)).willReturn(level);
        LevelDto savedLevel = levelService.save(levelDto);
        assertThat(savedLevel).isNotNull();
    }

    @DisplayName("Test delete level method when the ID is valid and found")
    @Test
    public void testSuccessDelete() {
        Integer levelID = 1;
        given(levelRepository.findById(levelID)).willReturn(Optional.of(level));
        willDoNothing().given(levelRepository).delete(level);
        levelService.delete(levelID);
        verify(levelRepository, times(1)).delete(level);
    }

    @DisplayName("Test delete level method when the ID is not found")
    @Test
    public void testDeleteNotFound() {
        Integer levelID = 999;

        given(levelRepository.findById(levelID)).willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> levelService.delete(levelID));

        verify(levelRepository, times(0)).deleteById(levelID);
    }

    @DisplayName("Test getAll levels method when the list is not empty")
    @Test
    public void testFilledGetAll() {
        Level level1 = Level.builder()
                .code(2)
                .description("level1 description")
                .points(30)
                .build();

        given(levelRepository.findAll()).willReturn(List.of(level, level1));

        given(modelMapper.map(level, LevelDto.class)).willReturn(levelDto);

        List<LevelDto> allLevels = levelService.getAll();

        verify(levelRepository).findAll();

        assertThat(allLevels)
                .isNotNull()
                .hasSize(2);
    }

    @DisplayName("Test getAll levels method when the list is empty")
    @Test
    public void testEmptyGetAll() {
        given(levelRepository.findAll()).willReturn(Collections.emptyList());
        List<LevelDto> allLevels = levelService.getAll();
        assertThat(allLevels).isEmpty();
    }

    @DisplayName("Test findByID level method when the id is valid")
    @Test
    public void testSuccessFindByID() {
        Integer levelID = 1;

        given(levelRepository.findById(levelID)).willReturn(Optional.of(level));
        given(modelMapper.map(level, LevelDto.class)).willReturn(levelDto);

        LevelDto foundLevel = levelService.findByID(levelID);

        verify(levelRepository).findById(levelID);

        assertThat(foundLevel).isNotNull();
    }

    @DisplayName("Test findByID level method when the id is not valid")
    @Test
    public void testFindByIDNotFound() {
        Integer invalidLevelID = 999;

        given(levelRepository.findById(invalidLevelID)).willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> levelService.findByID(invalidLevelID));

        verify(levelRepository).findById(invalidLevelID);
    }

    @DisplayName("Test update level method when the ID is valid")
    //@Test
    public void testSuccessUpdate() {
        Integer levelID = 1;

        given(levelRepository.findById(levelID)).willReturn(Optional.of(level));
        given(modelMapper.map(level, LevelDto.class)).willReturn(levelDto);

        LevelDto updatedLevelDto = new LevelDto();
        updatedLevelDto.setCode(1);  // Set the same code as the existing level
        updatedLevelDto.setDescription("updated level description");
        updatedLevelDto.setPoints(80);

        given(levelRepository.findTopByCodeLessThanOrderByCodeDesc(levelDto.getCode())).willReturn(Optional.of(level));
        given(levelRepository.findTopByCodeGreaterThanOrderByCodeAsc(levelDto.getCode())).willReturn(Optional.empty());

        LevelDto updatedLevel = levelService.update(levelID, updatedLevelDto);

        verify(levelRepository).findById(levelID);
        verify(levelRepository).save(level);

        assertThat(updatedLevel).isNotNull();
        assertThat(updatedLevel.getDescription()).isEqualTo("updated level description");
        assertThat(updatedLevel.getPoints()).isEqualTo(80);
    }

    @DisplayName("Test update level method when the ID is valid and code is changed (IllegalArgumentException expected)")
    @Test
    public void testUpdateCodeChanged() {
        Integer levelID = 1;

        given(levelRepository.findById(levelID)).willReturn(Optional.of(level));
        given(modelMapper.map(level, LevelDto.class)).willReturn(levelDto);

        LevelDto updatedLevelDto = new LevelDto();
        updatedLevelDto.setCode(2);
        updatedLevelDto.setDescription("updated level description");
        updatedLevelDto.setPoints(80);

        assertThrows(IllegalArgumentException.class, () -> levelService.update(levelID, updatedLevelDto));

        verify(levelRepository).findById(levelID);
        verify(levelRepository, never()).save(any());
    }



    @DisplayName("Test update level method when the ID is not valid")
    @Test
    public void testUpdateNotFound() {
        Integer invalidLevelID = 999;
        given(levelRepository.findById(invalidLevelID)).willReturn(Optional.empty());
        assertThrows(ResourceNotFoundException.class, () -> levelService.update(invalidLevelID, levelDto));
        verify(levelRepository).findById(invalidLevelID);
    }


}